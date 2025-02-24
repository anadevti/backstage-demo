// myTheme.ts
import { createTheme as createBackstageTheme, lightTheme } from '@backstage/theme';

// Criação do tema personalizado com estilo escuro
const myTheme = createBackstageTheme({
  ...lightTheme, // Herda as configurações do tema claro padrão

  // Paleta de cores escura e moderna
  palette: {
    ...lightTheme.palette,
    type: 'dark', // Define o tema como escuro
    primary: {
      main: '#BB86FC', // Roxo claro e vibrante
      contrastText: '#000000', // Texto preto para contraste
    },
    secondary: {
      main: '#BB86FC', // Ciano vibrante
      contrastText: '#000000', // Texto preto para contraste
    },
    background: {
      ...lightTheme.palette.background,
      default: '#121212', // Fundo escuro
      paper: '#1E1E1E', // Fundo escuro para elementos como cards
      sidebar: lightTheme.palette.background.sidebar || '#1F1F1F', // Sidebar escuro
    },
    text: {
      ...lightTheme.palette.text,
      primary: '#E0E0E0', // Texto claro para contraste
      secondary: '#B0B0B0', // Texto secundário mais suave
    },
  },

  // Tipografia moderna e legível
  typography: {
    ...lightTheme.typography,
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif', // Fonte moderna
    h1: {
      fontWeight: 700, // Negrito
      fontSize: '2.5rem', // Título grande
      lineHeight: 1.2, // Espaçamento confortável
      color: '#E0E0E0', // Cor clara para contraste
    },
    h2: {
      fontWeight: 700, // Negrito
      fontSize: '2rem', // Subtítulo
      lineHeight: 1.3, // Espaçamento confortável
      color: '#E0E0E0', // Cor clara para contraste
    },
    body1: {
      fontWeight: 400, // Peso normal
      fontSize: '1rem', // Tamanho padrão
      lineHeight: 1.5, // Espaçamento agradável para leitura
      color: '#E0E0E0', // Cor clara para contraste
    },
  },

  // Sobrescritas de componentes para um visual consistente
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none', // Remove transformação de texto para maiúsculas
        borderRadius: '8px', // Bordas arredondadas
        padding: '8px 16px', // Espaçamento interno confortável
        fontSize: '0.875rem', // Tamanho de fonte adequado
        fontWeight: 500, // Peso médio para botões
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Sombra sutil
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', // Sombra mais intensa ao passar o mouse
        },
      },
    },
    MuiCard: {
      root: {
        borderRadius: '12px', // Bordas arredondadas para cards
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)', // Sombra sutil
        backgroundColor: '#1E1E1E', // Fundo escuro para cards
      },
    },
    MuiAppBar: {
      root: {
        backgroundColor: '#1F1F1F', // Fundo escuro para a AppBar
      },
    },
  },
});

export default myTheme;