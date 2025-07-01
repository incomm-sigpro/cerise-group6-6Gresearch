import { createGlobalStyle } from 'styled-components';
import { getThemeColors } from './colors';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: linear-gradient(135deg, #fce4ec 0%, #fafafa 100%);
        color: #2f3746;
        transition: all 0.3s ease;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    /* Tema escuro */
    body[data-theme="dark"] {
        background: linear-gradient(135deg, #1a0f1a 0%, #121212 100%);
        color: #ffffff;
    }

    body, input, button, textarea {
        font-family: 'Ubuntu', sans-serif;
        font-size: 16px;
        outline: none;
    }

    a {
        text-decoration: none;
        color: #c60463;
        transition: color 0.2s ease;
    }

    body[data-theme="dark"] a {
        color: #e6398a;
    }

    a:hover {
        color: #8a0438;
    }

    body[data-theme="dark"] a:hover {
        color: #c60463;
    }

    button, a {
        cursor: pointer;
        transition: all 0.2s ease;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
        transform: translateY(-1px);
    }
        
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
        background-color: rgba(198, 4, 99, 0.1);
        color: #c60463;
        padding: 2px 4px;
        border-radius: 4px;
    }

    body[data-theme="dark"] code {
        background-color: rgba(198, 4, 99, 0.2);
        color: #e6398a;
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

    /* Scrollbar personalizada com tema CERISE */
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #c60463 0%, #e6398a 100%);
        border-radius: 6px;
        border: 2px solid #f5f5f5;
    }

    body[data-theme="dark"] ::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #e6398a 0%, #c60463 100%);
        border: 2px solid #2d2d2d;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #8a0438 0%, #c60463 100%);
    }

    body[data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #c60463 0%, #8a0438 100%);
    }

    ::-webkit-scrollbar-track {
        background: #fce4ec;
        border-radius: 6px;
        border: 1px solid rgba(198, 4, 99, 0.1);
    }

    body[data-theme="dark"] ::-webkit-scrollbar-track {
        background: #1a0f1a;
        border: 1px solid rgba(198, 4, 99, 0.2);
    }

    /* Seleção de texto personalizada */
    ::selection {
        background-color: rgba(198, 4, 99, 0.3);
        color: #8a0438;
    }

    body[data-theme="dark"] ::selection {
        background-color: rgba(230, 57, 138, 0.3);
        color: #ffffff;
    }

    ::-moz-selection {
        background-color: rgba(198, 4, 99, 0.3);
        color: #8a0438;
    }

    body[data-theme="dark"] ::-moz-selection {
        background-color: rgba(230, 57, 138, 0.3);
        color: #ffffff;
    }

    /* Focus personalizado para acessibilidade */
    *:focus {
        outline: 2px solid #c60463;
        outline-offset: 2px;
    }

    body[data-theme="dark"] *:focus {
        outline: 2px solid #e6398a;
        outline-offset: 2px;
    }

    /* Estilos para inputs */
    input, textarea, select {
        border: 1px solid rgba(198, 4, 99, 0.2);
        border-radius: 8px;
        padding: 8px 12px;
        transition: all 0.2s ease;
        background-color: #fff;
        color: #2f3746;
    }

    body[data-theme="dark"] input,
    body[data-theme="dark"] textarea,
    body[data-theme="dark"] select {
        border: 1px solid rgba(198, 4, 99, 0.3);
        background-color: #1e1e1e;
        color: #ffffff;
    }

    input:focus, textarea:focus, select:focus {
        border-color: #c60463;
        box-shadow: 0 0 0 3px rgba(198, 4, 99, 0.1);
    }

    body[data-theme="dark"] input:focus,
    body[data-theme="dark"] textarea:focus,
    body[data-theme="dark"] select:focus {
        border-color: #e6398a;
        box-shadow: 0 0 0 3px rgba(230, 57, 138, 0.2);
    }

    /* Estilos para botões */
    button {
        border-radius: 8px;
        border: none;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    button:active {
        transform: translateY(0);
    }
`;
