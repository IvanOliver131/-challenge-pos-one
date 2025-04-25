import { create } from "zustand";
import { enableMapSet } from "immer";
import { immer } from "zustand/middleware/immer";

export type Link = {
  originalLink: string;
  shortLink: string;
  access: number;
};

type LinkState = {
  links: Map<string, Link>;
  addLink: (link: Link) => void;
  deleteLink: (linkId: string) => void;
  downloadCSVLinks: () => void;
};

enableMapSet();

// set -> fazer alteração
// get -> pegar dados
export const useLinks = create<LinkState, [["zustand/immer", never]]>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  immer((set, get) => {
    function deleteLink(linkId: string) {
      console.log(linkId)
    }
    function downloadCSVLinks() {
      console.log('download')
    }

    function addLink(link: Link) {
      console.log(link)
      // set((state) => {
      //   state.links.set('id_1', link);
      // });
    }

    return {
      links: new Map(),
      addLink,
      deleteLink,
      downloadCSVLinks
    };
  })
);
