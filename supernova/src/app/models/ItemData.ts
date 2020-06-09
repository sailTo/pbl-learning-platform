export interface ItemData {
    s_id: string;
    s_name: string;
    discussNum?: number;
    assignmentDoneNum?: number;
    selfScore?: number;
    mutualScore?:number;
    teacherAllScore?:number;
    dynamicScore?: DynamicScore[];
    haveScored?:boolean;
  }
  interface DynamicScore{
    item_id: string,
    item_name: string,
    grade : number
  }