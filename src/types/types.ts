export type ThreadCategory = "THREAD" | "QNA";

export type User = {
	userName: string;
	password: string
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
	commentAnswerId?: number;
}

export type Comment = {
	id: number;
	thread: number;
	content: string;
	creator: User
}