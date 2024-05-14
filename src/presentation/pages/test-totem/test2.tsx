import React, { useState } from 'react';

// Definição da tipagem para os itens da lista
interface ListItem {
  id: number;
  name: string;
}

// Props do componente
interface FilterableListProps {
  items: ListItem[];
}

const FilterableList: React.FC<FilterableListProps> = ({ items }) => {
  // Estado para controlar o termo de busca
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Função para filtrar os itens com base no termo de busca
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id} className="p-2 border-b border-gray-300">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterableList;
