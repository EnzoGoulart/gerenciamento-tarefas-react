import { useState } from "react"
import './home.css'
import { Link, useNavigate } from "react-router-dom"

import { auth } from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"  

export default function Home(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        //não deixa atualizar a pagina

        if(email !== '' && password!==''){
            await signInWithEmailAndPassword(auth, email, password).then(()=>{
                console.log('logado')
                navigate('/admin', {replace: true})
            }).catch(er=>{
                console.log('erro '+ er)
            })
        }else{
            alert('nao esta ok')
        }
    }

    return(
        <div>
            <h1>Lista de Tarefas</h1>
            <p id="subtitle">Gerencie suas tarefas de forma facilitada.</p>

            <form onSubmit={handleLogin}>
                <label htmlFor="email" id="pEmail">email</label>
                <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                <label htmlFor="senha" id="pSenha">senha</label>
                <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                <button id="submit" type="submit">Enviar</button>
                <Link to="/register">Não tem uma conta? <strong>Cadatre-se</strong></Link>
            </form>
        </div>
    )
}