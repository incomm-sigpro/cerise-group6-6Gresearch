import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${({ theme }) => theme.palette.grey[100]};
        color: ${({ theme }) => theme.palette.text.primary};
        /* overflow: hidden; */

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    body, input, button, textarea {
        font-family: 'Ubuntu', sans-serif;
        font-size: 16px;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }
        
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }

    @font-face {
    font-family: 'Ubuntu';
    font-weight: 300;
    src: url('/fonts/Ubuntu-Light.woff2') format('woff2');
    }

    @font-face {
    font-family: 'Ubuntu';
    font-weight: 400;
    src: url('/fonts/Ubuntu-Regular.woff2') format('woff2');
    }
    
    @font-face {
    font-family: 'Ubuntu';
    font-weight: 500;
    src: url('/fonts/Ubuntu-Medium.woff2') format('woff2');
    }

    @font-face {
    font-family: 'Ubuntu';
    font-weight: 700;
    src: url('/fonts/Ubuntu-Bold.woff2') format('woff2');
    }

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    ::-webkit-scrollbar-track {
        background: #ddd;
        border-radius: 6px;
    }
`;
