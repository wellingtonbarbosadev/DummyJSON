export interface Usuario {}

export interface Login {
  username: string;
  password: string;
}

export interface UsuarioAutenticado {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'masculino' | 'feminino' | 'outro';
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface PerfilCompleto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string
  image: string;
}
