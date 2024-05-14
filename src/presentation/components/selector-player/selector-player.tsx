import React, { useContext, useState, PropsWithChildren, useEffect } from "react";
import Styles from './selector-player.scss'
import { DfsSlatePlayer, League, LeagueList } from "@/presentation/test/league-test1";
import ContextState from '@/presentation/contexts/tests/test1-context';
import { FilterState } from "@/presentation/pages/test-totem/test1";
import { SetFilter } from "../select/select";

interface Props {
  data?: LeagueList
  styles?: React.CSSProperties;
}

export const SelectorTable = ({
  data,
  styles,
}: PropsWithChildren<Props>) => {

  return (
    <>
      <div className={`${Styles.container}`}>
        <div className={`${Styles.selectPlayer}`}>
          FIGURA
          {/* <img src={imageSrc} alt="Descrição da imagem"></img> */}
        </div>
      </div>

      <div className={`${Styles.container}`}>
        <div className={`${Styles.selectPlayer}`}>
          <h1>Tom brady</h1>
          <label>Points</label>
        </div>
      </div>
    </>
  )
};

export default SelectorTable;


