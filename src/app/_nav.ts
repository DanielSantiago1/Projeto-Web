import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Página Inicial',
    url: '/dashboard',
    icon: 'icon-home',
  },
  {
    title: true,
    name: 'Alunos'
  },
  {
    name: 'Cadastrar',
    url: '/alunos/cadastrar',
    icon: 'icon-user',
  },
  {
    name: 'Listar',
    url: '/alunos/listar',
    icon: 'icon-people',
  },
  {
    title: true,
    name: 'Avaliações'
  },
  {
    name: 'Agendar',
    url: '/avaliacoes/agendar',
    icon: 'icon-calendar',
  },
  {
    name: 'Consultar',
    url: '/avaliacoes/consultar',
    icon: 'icon-note',
  },
  {
    name: 'Realizar',
    url: '/avaliacoes/tipo',
    icon: 'icon-note',
    children: [
      {
        name: 'Avaliação Simples',
        url: '/avaliacoes/tipo/simples',
        icon: 'icon-user',
      },
    ]
  },
  {
    title: true,
    name: 'Usuários'
  },
  {
    name: 'Novo usuário',
    url: '/usuarios/criar',
    icon: 'icon-user',
  },
    
];

