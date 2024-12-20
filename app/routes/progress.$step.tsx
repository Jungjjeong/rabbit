import { css } from "@emotion/react";
import { useParams } from "@remix-run/react";
import { useEffect } from "react";
import FlipCard from "~/components/flip-card";
import ProgressBar from "~/components/progress-bar";
import { useTimer } from "~/hooks/useTimer";

const FLIP_DURATION = 100;
const PROGRESS_DURATION = FLIP_DURATION + 3000; // Flip time + 3s

export default function Game() {
  const { step } = useParams();

  const { start, stop, progress } = useTimer(PROGRESS_DURATION);

  useEffect(() => {
    setTimeout(() => start(), FLIP_DURATION);
  }, []);

  if (!step) return <div>로딩중</div>;

  return (
    <>
      <div css={containerCss}>
        <h1>다르게 생긴 {}를 찾아줘</h1>
        <ProgressBar progress={progress} />
        <div role="button" css={imageGridCss(Number(step) + 1)}>
          {Array(4)
            .fill(null)
            .map((_, idx) => (
              <FlipCard key={idx} onClick={stop} duration={FLIP_DURATION}>
                <> {idx + 1}번째 이미지</>
              </FlipCard>
            ))}
        </div>
      </div>
    </>
  );
}

const containerCss = css`
  height: 100%;

  padding: 0 24px;

  background-color: #f0f4fc;
  text-align: center;

  > h1 {
    margin-top: 4px;

    font-weight: 400;
    font-size: 20px;
    line-height: 34px;
  }
`;

const imageGridCss = (gridCnt: number) => css`
  display: grid;
  grid-template-columns: repeat(${gridCnt}, 1fr);
  gap: 12px;

  max-height: 80%;
  aspect-ratio: 3/4;

  margin: 28px auto;

  cursor: pointer;

  > div {
    width: 100%;
    height: 100%;

    border-radius: 12px;
  }
`;
