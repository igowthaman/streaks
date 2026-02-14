import { create } from 'zustand';

type State = {
  route: string;
};

type Action = {
  updateRoute: (route: State['route']) => void;
};

const useRouteStore = create<State & Action>((set) => ({
  route: '',
  updateRoute: (route) => set(() => ({ route: route })),
}));

export default useRouteStore;
