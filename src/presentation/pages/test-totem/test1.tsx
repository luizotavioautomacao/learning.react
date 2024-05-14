import React, { useState, useEffect } from "react";
import Styles from "./test-totem.scss";
import { Header, Footer } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import Selector from "@/presentation/components/selector/selector";
import TableSelector from "@/presentation/components/selector-table/selector-table";
import { DfsSlatePlayer, LeagueList } from "@/presentation/test/league-test1";
import Context from '@/presentation/contexts/tests/test1-context';
import Paginator from "@/presentation/components/paginator/paginator";
import SelectorPlayer from "@/presentation/components/selector-player/selector-player";
// import imageSrc from './picture.png'; // Importa a imagem
const data: LeagueList = require('@/data/test/test1.json');

type Props = {
  validation?: Validation
}

export interface FilterState {
  page: number
  totalPage: number
  limit: number
  data: LeagueList
  playersPage: DfsSlatePlayer[]
  playersTotal: DfsSlatePlayer[]
}

const Test: React.FC<Props> = ({ validation }: Props) => {

  const [filter, setFilter] = useState<FilterState>({
    page: 1,
    totalPage: 1,
    limit: 10,
    data: data,
    playersPage: null,
    playersTotal: null
  })

  return (
    <div className={Styles.league}>
      <Header />
      <div className="container mx-auto">
        <Context.Provider value={{ filter, setFilter }}>
          <div className={`${Styles.selector}`}>
            <Selector data={data}></Selector>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className={`col-span-4 md:col-span-3 bg-gray-200 p-4 ${Styles.table}`}>
              <TableSelector data={data} > </TableSelector>
              <Paginator></Paginator>
            </div>
            <div className={`hidden md:block col-span-3 md:col-span-1 bg-gray-300 p-4 ${Styles.selectPlayer}`}>
              <SelectorPlayer ></SelectorPlayer>
            </div>
          </div>
        </Context.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
