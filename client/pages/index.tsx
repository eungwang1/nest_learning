import axios, { AxiosError } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { FormEvent } from "react";
import styled from "styled-components";
import useSWR, { Fetcher } from "swr";
import { Cat } from "../customTypes/cats";
import Layout from "../src/components/common/Layout";
import useInput from "../src/hooks/useInput";
import { useCookies } from "react-cookie";
interface HomeProps {
  me: Cat | null;
  access_token: string;
  refresh_token: string;
}
const Home = ({ me, access_token, refresh_token }: HomeProps) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const {
        config,
        response: { status },
      } = error;
      if (status === 401) {
        const originalRequest = config;
        const refreshToken = refresh_token;
        const {
          data: { accessToken: newAcessToken },
        } = await axios.post(
          `http://localhost:8000/refresh-token`, // token refresh api
          {
            refresh_token,
          },
          {
            withCredentials: true,
          }
        );
        // 새로운 토큰 저장
        originalRequest.headers.authorization = `Bearer ${newAcessToken}`;
        // 419로 요청 실패했던 요청 새로운 토큰으로 재요청
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  const [value, onChangeValue] = useInput("");
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: allCats, error: allCatsError } = useSWR<Cat[]>("http://localhost:8000/cats", fetcher);
  if (allCatsError) return <div>failed to load</div>;
  if (!allCats) return <div>loading...</div>;
  const onsubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/posts", {
      content: value,
    });
  };
  return (
    <HomeContainer>
      <Layout me={me}>
        <div className="home-wrapper">
          <div className="cats-container">
            <h3>cats list</h3>
            <ul className="cats-list-ul">
              {allCats.map((cat) => (
                <li className="cats-list-li" key={cat.id}>
                  <span className="cats-email">{cat.email}</span>
                  <span className="cats-name">{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={onsubmit}>
            <input value={value} onChange={onChangeValue} />
            <button type="submit">글쓰기</button>
          </form>
        </div>
      </Layout>
    </HomeContainer>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let me = null;
  const { access_token, refresh_token } = ctx.req.cookies;
  if (ctx.req && access_token) {
    try {
      const res = await axios.get("http://localhost:8000/me", {
        headers: {
          Authorization: access_token,
        },
      });
      me = res.data;
    } catch (error: AxiosError | any) {
      const { response } = error as AxiosError;
      if (response?.status === 401) {
        const {
          data: { accessToken: newAcessToken },
        } = await axios.post(
          `http://localhost:8000/refresh-token`, // token refresh api
          {
            refresh_token,
          },
          {
            withCredentials: true,
          }
        );
        const res = await axios.get("http://localhost:8000/me", {
          headers: {
            Authorization: `Bearer ${newAcessToken}`,
          },
        });
        me = res.data;
      } else {
        console.error(error);
      }
    }
  }
  return { props: { me, access_token: access_token || null, refresh_token: refresh_token || null } };
};

const HomeContainer = styled.div`
  .home-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .cats-container {
    border: 1px solid #e4e4e4;
    padding: 10px 30px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  .cats-list-ul {
    width: 100%;
    li {
      + li {
        margin-top: 10px;
      }
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }
  }
  .cats-name {
    margin-left: auto;
  }
`;
