import React from "react";
import { Card, Content, Title, Body, Footer } from "./style";
import { boardInfo } from "@/Types/MainType";

type Props = {
  borderID: number;
  imgSrc: string;
  board: boardInfo;
};

export default function MainCard({ board, imgSrc, borderID }: Props): JSX.Element {
  const test = () => {
    alert(borderID);
  };
  return (
    <Card onClick={test}>
      <img src={imgSrc} alt="이미지" style={{ objectFit: "cover", height: "200px", width: "100%", borderRadius: "10px 10px 0px 0px" }} />

      <Content>
        <Title>{board.title}</Title>
        <Body>{board.body}</Body>
        <Footer>
          <div>{board.footer[0]}</div>
          <div>#{board.footer[1]}</div>
        </Footer>
      </Content>
    </Card>
  );
}