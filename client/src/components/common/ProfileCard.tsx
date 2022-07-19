import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Cat } from "../../../customTypes/cats";
interface ProfileCardProps {
  me: Cat | null;
}
const ProfileCard = ({ me }: ProfileCardProps) => {
  const router = useRouter();
  const onLogOut = async () => {
    try {
      await axios.post("http://localhost:8000/logout", undefined, {
        withCredentials: true,
      });
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <ProfileCardContainer>
      <div>{me?.name}님 안녕하세요</div>
      <button onClick={onLogOut}>로그아웃</button>
    </ProfileCardContainer>
  );
};

export default ProfileCard;

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
