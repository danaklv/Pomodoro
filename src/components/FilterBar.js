
import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;


const FilterButton = styled.button`
    background: ${({ active, theme }) => (active ? theme.primaryColor : theme.cardBackground)};
    color: ${({ active, theme }) => (active ? '#fff' : theme.textColor)};
    border: 1px solid ${({ theme }) => theme.primaryColor};
    padding: 10px 20px;
    margin: 0 6px;
    border-radius: 25px;
    cursor: pointer;
    transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    
    &:hover {
        background: ${({ theme }) => theme.primaryColor};
        color: #fff;
    }
`;

const FilterBar = ({ filter, setFilter }) => {
    const filters = ['All', 'In progress', 'Completed'];

    return (
        <FilterContainer>
            {filters.map((status) => (
                <FilterButton
                    key={status}
                    active={filter === status}
                    onClick={() => setFilter(status)}
                >
                    {status}
                </FilterButton>
            ))}
        </FilterContainer>
    );
};

export default FilterBar;
