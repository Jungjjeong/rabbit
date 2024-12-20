import { css } from "@emotion/react";
import { AllHTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<AllHTMLAttributes<HTMLDivElement>, "children"> {
  duration?: number;
  children: React.ReactNode;
}

export default function FlipCard({ duration = 100, children, ...props }: Props) {
  const [flip, setFlip] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setFlip(true), duration);
  }, []);

  return (
    <div css={[cardContainerCss, flip && flipCss]} {...props}>
      <div css={[innerCss, flip && flipCss]}>
        <div css={[cardCss]}>{children}</div>
        <div css={[cardCss, backfaceCss]}>뒷면</div>
      </div>
    </div>
  );
}

const cardContainerCss = css`
  width: 300px;
  height: 200px;

  perspective: 1000px;
  background-color: transparent;
`;

const innerCss = css`
  position: relative;

  width: 100%;
  height: 100%;

  transition: transform 1s;
`;

const cardCss = css`
  position: absolute;

  width: 100%;
  height: 100%;

  background-color: white;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const flipCss = css`
  transform: rotateY(180deg);
`;

const backfaceCss = css`
  transform: rotateY(180deg);
`;
