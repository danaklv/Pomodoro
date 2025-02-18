// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

// export const GlobalStyles = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     font-family: 'Roboto', sans-serif;
//     background: ${({ theme }) => theme.bodyBackground};
//     color: ${({ theme }) => theme.textColor};
//     transition: background 0.3s ease-in, color 0.3s ease-in;
//   }
  
//   * {
//     box-sizing: border-box;
//   }
// `;

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', sans-serif;
        background: ${({ theme }) => theme.bodyBackground};
        color: ${({ theme }) => theme.textColor};
        transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
    }
    * {
        box-sizing: border-box;
    }
`;