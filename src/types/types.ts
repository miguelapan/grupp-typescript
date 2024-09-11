export type ThreadCategory = "THREAD" | "QNA";

export type User = {
	id?: string;
	userName: string;
	password: string
	isModerator?: boolean;
}

export type Thread = {
  id: string; // ÄNDRAT FRÅN NUMBER TILL STRING PGA FIREBASE 
	title: string;
	category: ThreadCategory;
	creationDate: string;
	description: string;
	creator: User;
}

export type QNAThread =  Thread & { //Type extension
	category: "QNA";
	isAnswered: boolean;
	answerId?: string;  //SVARETS ID
}

export type Comment = {
	id: string;
	thread: string;
	content: string;
	creator: User;
	parentCommentId?: string; // DEN FICK HETA SÅ BARA
	comments?: Comment[]; //DÄR FÅR DOM VARA
}