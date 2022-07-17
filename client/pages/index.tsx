import axios from "axios";
import type { NextPage } from "next";
import { FormEvent } from "react";
import styled from "styled-components";
import useSWR, { Fetcher } from "swr";
import { Cat } from "../customTypes/cats";
import Layout from "../src/components/common/Layout";
import useInput from "../src/hooks/useInput";

const Home: NextPage = () => {
  const [value, onChangeValue] = useInput("");
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: allCats, error: allCatsError } = useSWR<Cat[]>("http://localhost:8000/cats", fetcher);
  if (allCatsError) return <div>failed to load</div>;
  if (!allCats) return <div>loading...</div>;
  const onsubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("test");
  };
  return (
    <HomeContainer>
      <Layout>
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

const HomeContainer = styled.div`
  .home-wrapper {
    display: flex;
    flex-direction: column;
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
