import React from 'react';
import {addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc} from "firebase/firestore/lite";
import {authService, db} from "./firebase";
import {useRecoilState} from "recoil";
import {quizleState, useForm} from "./recoil/quizleState";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import Update from "./components/update";


const App = () => {

    authService.onAuthStateChanged(user => {
        console.log(user);

        if (user) {
            console.log('login')

        } else {
            const data = createUserWithEmailAndPassword(
                authService,
                'dev.kks0211@gmail.com',
                '!black95372'
            );
            console.log(data);
        }

    })

    const [quizle, setQuizle] = useRecoilState(quizleState);
    const [form, setForm] = useRecoilState(useForm);
    const {category, question} = form;

    const quizleCollectionRef = collection(db, "quizle");

    const onChange = (e) => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value,
        }
        setForm(nextForm);
    };

    const addData = async () => {

        try {
            const docRef = await addDoc(quizleCollectionRef, {
                category: category,
                question: question
            });

            setForm({
                id: '',
                category: '',
                question: ''
            })
            console.log("Document written with ID: ", docRef);

            await readData();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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

    const updateData = async (id: string) => {

        const req = await query(quizleCollectionRef);

        console.log(req)
        //const reqId = await getDocs(req);
        const quizleDoc = await doc(db, "quizle", id);

        const res = await updateDoc(quizleDoc, {category: category, question: question});
        console.log(res); // res는 undefined

        setForm({
            id: '',
            category: '',
            question: ''
        })

        await readData();
    };

    const deleteData = async (id: string) => {
        const quizleDoc = doc(db, "quizle", id);

        try {
            const res = await deleteDoc(quizleDoc);
            console.log(res); // res는 undefined
            await readData();
        } catch (e) {
            console.log(e);
        } finally {
            console.log("end");
        }
    };

    return (
        <div>
            카테고리 : <input type="text" name="category" value={category} onChange={onChange}/><br/>
            문제 : <input type="text" name="question" value={question} onChange={onChange}/><br/>
            <button onClick={addData}>추가</button>
            <button onClick={readData}>조회</button>
            <Update></Update>
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
    );
};

export default App;
