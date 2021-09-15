export function saveStatePlugin(store: any): void {
  store.subscribe((mutation: any, state: any) => localStorage.setItem("settings", JSON.stringify(state.settings)));
}
