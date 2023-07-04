import { useState, useEffect } from "react";
import "./admin.css";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";
export default function Admin() {
  const [input, setInput] = useState("");
  const [user, setUser] = useState({});
  const [erro, setErro] = useState("");
  const [tar, setTar] = useState([]);
     const [ edit, setEdit] = useState({})

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
 
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);
        const tarefasR = collection(db, "tarefas");
        const q = query(
          tarefasR,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (sn) => {
          let lista = [];
          sn.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });
          setTar(lista);
        });
      }
    }
    loadTarefas();
  }, []);

  async function registro(e) {
    e.preventDefault();
    if (input === "") {
      setErro("Digite algo.");
      return;
    } else {
      setErro("");
    }
    if(edit?.id){
        update()
        return;
    }
    await addDoc(collection(db, "tarefas"), {
      tarefa: input,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        setInput("");
        setErro("Tarefa registrada com sucesso");
      })
      .catch((err) => {
        setErro("Erro ao registrar");
      });
  }
  async function logout() {
    await signOut(auth);
  }
  async function deletar(id){
    await deleteDoc(doc(db, 'tarefas', id)).then(()=>{
    
    }).catch(err=>{console.log('erro' + err)}) 
  }
  async function editar(t){
    setInput(t.tarefa)
    setEdit(t)
  }
  async function update(){
    const docRef = doc(db, 'tarefas', edit?.id)
    await updateDoc(docRef, {
        tarefa: input
    }).then(()=>{
        setInput('')
        setEdit({})
    }).catch(()=>{
        setErro('Erro ao atualizar')
    })
  }
  return (
    <div>
      <h1>Minhas tarefas</h1>
      <form onSubmit={registro}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <p id="pErro">{erro}</p>
        {Object.keys(edit).length>0 ? (
            <button type="submit" id="rT">
            Alterar</button>
        ):(
            <button type="submit" id="rT">
          Registrar
        </button>
        )}
      </form>
      {tar.map((t) => {
        return (
          <div id="divTar" key={t.id}>
            <p id="pTar">{t.tarefa}</p>
            <button id="bET" onClick={()=> editar(t)}>Editar</button>
            <button id="bCT" onClick={()=> deletar(t.id)}>Concluir</button>
          </div>
        );
      })}
      <button id="logout" onClick={logout}>
        Sair
      </button>
    </div>
  );
}
