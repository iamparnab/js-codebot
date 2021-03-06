export type NewTabType = {
  tabName: string;
};

export type SelectTabType = {
  tabId: number;
};

export type SetCodeType = {
  code: string;
};

export type RunQueryType = {
  query: string;
};
export type ChatInputType = {
  chatInput: string;
};
export type BotResponseType = {
  response: string;
};
export type RemoveTabType = {
  tabId: number;
};

export type ShowToasterType = {
  text: string;
};

export type ApplyChangesType = {
  noShow?: boolean;
};

export enum Actions {
  ADD_NEW_TAB,
  SELECT_TAB,
  SET_CODE,
  APPLY_CHANGES,
  UPDATE_CHAT_INPUT,
  RUN_QUERY,
  ADD_BOT_RESPONSE,
  REMOVE_TAB,
  SHOW_TOASTER,
  HIDE_TOASTER,
  TOGGLE_QUERY_PROCESSING,
}

export type PayloadType =
  | ApplyChangesType
  | ShowToasterType
  | RemoveTabType
  | BotResponseType
  | ChatInputType
  | NewTabType
  | SelectTabType
  | SetCodeType
  | RunQueryType;

export type ActionType = { type: Actions; payload?: PayloadType };
