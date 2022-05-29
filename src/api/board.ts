import API from ".";
import { Board, PersonalInfo, ICreateBoard, Like, TagCount, Writer } from "@src/Types/main";

export function getMainBoard(page: number): Promise<Board[]> {
  return new Promise<Board[]>((resolve, reject) => {
    API.post("/board/BoardMain", { page: page })
      .then((res) => {
        if (res.data.message) {
          reject(res.data.message);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function getPersonalBoard(page: number, userId: number): Promise<PersonalInfo> {
  return new Promise<PersonalInfo>((resolve, reject) => {
    API.post("/board/BoardPersonal", { page: page, user_id: userId })
      .then((res) => {
        if (res.data.message) {
          reject(res);
        }

        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function getBoardPersonalTag(page: number, userId: number, tag: string[]): Promise<Board[]> {
  return new Promise<Board[]>((resolve, reject) => {
    API.post("/board/BoardPersonalTag", { page: page, user_id: userId, tag_name: tag })
      .then((res) => {
        if (res.data.message) {
          reject(res.data.message);
        }

        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function touchLikes(board_id: number): Promise<Like> {
  return new Promise<Like>((resolve, reject) => {
    API.post("/board/Like", { board_id: board_id })
      .then((res) => {
        resolve(res.data[0]);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function CreateBoard(_createBoard: ICreateBoard): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    API.post("/board/CreateBoard", _createBoard)
      .then((res) => {
        resolve(res.statusText);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function DeleteBoard(board_id: number): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    API.patch("/board/BoardDelete", { board_id: board_id })
      .then((res) => {
        console.log("DeleteBoard", res.statusText);
        resolve("OK");
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function getBoardPersonalTagCount(user_id: number): Promise<TagCount[]> {
  return new Promise<TagCount[]>((resolve, reject) => {
    API.post("/board/boardPersonalTagCount", { user_id: user_id })
      .then((res) => {
        console.log("getBoardPersonalTagCount", res.data);
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}

export function getBoardPersonalWriter(user_id: number): Promise<Writer> {
  return new Promise<Writer>((resolve, reject) => {
    API.post("/board/BoardPersonalWriter", { user_id: user_id })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
}
