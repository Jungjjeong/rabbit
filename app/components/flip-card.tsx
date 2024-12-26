import { css } from "@emotion/react";
import { AllHTMLAttributes, useEffect, useState } from "react";

interface Props extends Omit<AllHTMLAttributes<HTMLDivElement>, "children"> {
  delay?: number; // ms
  duration?: number; // ms
  children: React.ReactNode;
}

export default function FlipCard({ delay = 100, duration = 1000, children, ...props }: Props) {
  const [flip, setFlip] = useState<boolean>(false);

  useEffect(() => {
    let delayFlip = setTimeout(() => setFlip(true), delay);
    return () => clearTimeout(delayFlip);
  }, []);

  return (
    <div css={[cardContainerCss, flip && flipCss]} {...props}>
      <div css={[innerCss(duration / 1000), flip && flipCss]}>
        <div css={[cardCss, backfaceCss]}>
          {/** not work, but no used */}
          <div>뒷면</div>
        </div>
        <div css={[cardCss]}>{children}</div>
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

const innerCss = (duration: number) => css`
  position: relative;

  width: 100%;
  height: 100%;

  transition: transform ${duration}s;
`;

const cardCss = css`
  position: absolute;

  width: 100%;
  height: 100%;

  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const flipCss = css`
  transform: rotateY(180deg);
`;

const backfaceCss = css`
  transform: rotateY(180deg);
`;
