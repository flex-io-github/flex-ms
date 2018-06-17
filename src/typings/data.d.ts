import { IGroup } from 'office-ui-fabric-react/lib/DetailsList';
export declare function createListItems(count: number, startIndex?: number): any;
export declare function createGroups(groupCount: number, groupDepth: number, startIndex: number, itemsPerGroup: number, level?: number, key?: string): IGroup[];
export declare function lorem(wordCount: number): string;
export declare function isGroupable(key: string): boolean;
