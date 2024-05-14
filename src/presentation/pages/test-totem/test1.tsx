import React, { useState, useEffect } from "react";
import Styles from "./test-totem.scss";
import { Header, Footer } from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";
import Selector from "@/presentation/components/selector/selector";
import TableSelector from "@/presentation/components/selector-table/selector-table";
import { DfsSlatePlayer, LeagueList } from "@/presentation/test/league-test1";
import Context from '@/presentation/contexts/tests/test1-context';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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

  const handlePreviousPage = () => {
    setFilter({ ...filter, page: filter.page - 1 });
  };

  const handleNextPage = () => {
    setFilter({ ...filter, page: filter.page + 1 });
  };

  return (
    <div className={Styles.league}>
      <Header />
      <div className="container mx-auto">
        <Context.Provider value={{ filter, setFilter }}>
          <div className="grid grid-cols-3 gap-4">
            <Selector data={data}></Selector>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 md:col-span-3 bg-gray-200 p-4">
              <TableSelector data={data} >Coluna 1</TableSelector>
              <div>
                <span>
                  Page {filter.page} of {filter.totalPage}
                  <button onClick={handlePreviousPage} disabled={filter.page === 1}>
                    <span><ChevronLeft size="20" /></span>
                  </button>
                  {filter.page}
                  <button onClick={handleNextPage} disabled={filter.page === filter.totalPage}>
                    <span><ChevronRight size="20" /></span>
                  </button>
                </span>
              </div>
            </div>
            <div className="hidden md:block col-span-3 md:col-span-1 bg-gray-300 p-4">
              <div>
                FIGURA
                {/* <img src={imageSrc} alt="Descrição da imagem"></img> */}
              </div>
              <h1>Tom brady</h1>
              <label>Points</label>
            </div>
            {/* <div className="col-span-3 bg-gray-400 p-4">Conteúdo da coluna 3</div> */}
          </div>
        </Context.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
