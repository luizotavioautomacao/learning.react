import React, { useContext, useState, PropsWithChildren } from "react";
import Styles from "./selector-styles.scss";
import Select, { SetFilter } from "@/presentation/components/select/select";
import { LeagueList } from "@/presentation/test/league-test1";
import ContextState from '@/presentation/contexts/tests/test1-context';
import { FilterState } from "@/presentation/pages/test-totem/test1";
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  data?: LeagueList
}


const Paginator = ({ data }: PropsWithChildren<Props>) => {

  const { filter, setFilter }: { filter: FilterState, setFilter: SetFilter }
  = useContext(ContextState) // contexto criado em Test1

  const handlePreviousPage = () => {
    setFilter({ ...filter, page: filter.page - 1 });
  };

  const handleNextPage = () => {
    setFilter({ ...filter, page: filter.page + 1 });
  };

  return (
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
  );
};

export default Paginator;
