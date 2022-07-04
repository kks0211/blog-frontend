import React from "react";
import {collection, getDocs, query} from "firebase/firestore/lite";
import {db} from "../firebase";
import {quizleState, useForm} from "./recoil/quizleState";
import {useRecoilState} from "recoil";

const list = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [quizle, setQuizle] = useRecoilState(quizleState);
    const quizleCollectionRef = collection(db, "quizle");

    const readData = async () => {

        //const req = await query(quizleCollectionRef, limit(5));
        const req = await query(quizleCollectionRef);
        const reqData = await getDocs(req);

        const newData = reqData.docs.map(doc => ({
            id: doc.id,
            ...doc.data()

        }))

        console.log(newData);
        setQuizle(newData);
    }

    return (
        <div>
            {quizle.map((item, index) =>
                <div key={index}>
                    카테고리 : {item.category}<br/>
                    문제 : {item.question}<br/>
                    <button onClick={() => {
                        updateData(item.id).then()
                    }}>수정
                    </button>
                    <button onClick={() => {
                        deleteData(item.id).then()
                    }}>삭제
                    </button>
                    <br/>
                </div>,
            )
            }
        </div>
    )
}

export default list;