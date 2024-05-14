import React, { useContext, useState, PropsWithChildren, useEffect } from "react";
import ContextState from '@/presentation/contexts/tests/test1-context';
import Styles from './selector-table-styles.scss'
import { DfsSlatePlayer, League, LeagueList } from "@/presentation/test/league-test1";
import { FilterState } from "@/presentation/pages/test-totem/test1";
import { SetFilter } from "../select/select";

interface Props {
  data: LeagueList
  styles?: React.CSSProperties;
}

export const TableSelector = ({
  data,
  styles,
}: PropsWithChildren<Props>) => {

  const { filter, setFilter }: { filter: FilterState, setFilter: SetFilter }
    = useContext(ContextState) // contexto criado em Test1

  const updateDataTable = (filteredPlayers) => {
    const startIndex = (filter.page - 1) * filter.limit
    const endIndex = filter.page * filter.limit
    const playersPage = filteredPlayers.slice(startIndex, endIndex);
    const totalPage = Math.ceil(filteredPlayers.length / filter.limit);

    setFilter({
      ...filter,
      totalPage: totalPage,
      playersTotal: filteredPlayers,
      playersPage: playersPage
    });
  }

  useEffect(() => {

    let filteredPlayers: DfsSlatePlayer[] = [];
    // Filtrar os jogadores de acordo com o filtro aplicado
    filter.data.map(async (item: League) => {
      await item.dfsSlatePlayers.forEach((subItem: DfsSlatePlayer) => {
        filteredPlayers.push(subItem);
      });
    });

    updateDataTable(filteredPlayers)

  }, [filter.data, filter.page, filter.limit]);

  return (
    <div
    // className="grid grid-cols-12 gap-4"
    >
      <div
      className={`col-span-10 ${Styles.tableBox}`}
      >
        <div
        // className="overflow-x-auto"
        >
          <table
            className="table-auto w-full"
          >
            <thead className={`${Styles.titleTable}`}>
              <tr>
                <th
                  className="px-2 py-2"
                >Name</th>
                <th
                  className="px-2 py-2"
                >Team</th>
                <th
                  className="px-2 py-2"
                >Position</th>
                <th
                  className="px-2 py-2"
                >Salary</th>
                <th
                  className="px-2 py-2"
                >Points</th>
              </tr>
            </thead>
            <tbody>
              {filter.playersPage && filter.playersPage.map(
                (player) => (
                  <tr key={player.slateId}>
                    <td
                      className="px-1 py-1"
                    >{player.operatorPlayerName}</td>
                    <td
                      className="px-1 py-1"
                    >{player.team}</td>
                    <td
                      className="px-1 py-1"
                    >{player.operatorPosition}</td>
                    <td
                      className="px-1 py-1"
                    >{player.operatorSalary}</td>
                    <td
                      className="px-1 py-1" style={{paddingLeft:"10px"}}
                    >{player.fantasyPoints ? player.fantasyPoints : 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSelector;


