import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { usePhaseActions } from "~/utils/usePhaseActions";

export default function Question() {
  const { increasePhase } = usePhaseActions();

  useEffect(() => {
    let show = setTimeout(() => {
      increasePhase();
    }, 2000);

    return () => clearTimeout(show);
  }, []);

  return (
    <div css={containerCss}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }} css={descriptionCss}>
        여러 개의 그림 중
        <br />
        다른 그림 하나를 찾아줘!
      </motion.p>
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  background-color: #f0f4fc;

  text-align: center;
`;

const navigationCss = css`
  position: absolute;
  top: 0;

  display: flex;
  align-items: center;

  max-width: var(--layout-max-width);
  width: 100%;

  margin: 0 auto;
  padding: 20px;
`;

const descriptionCss = css`
  font-size: 20px;
`;
