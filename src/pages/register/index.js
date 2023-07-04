import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {auth} from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
export default function Register(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        //não deixa atualizar a pagina

        if(email !== '' && password!==''){
            await createUserWithEmailAndPassword(auth, email, password).then(()=>{
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
            <h1>Faça o seu cadastro</h1>
            <p id="subtitle">acesse nossos serviços gratuitamente.</p>

            <form onSubmit={handleLogin}>
                <label htmlFor="email" id="pEmail">email</label>
                <input type="text" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                <label htmlFor="senha" id="pSenha">senha</label>
                <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                <button id="submit" type="submit">Cadastrar</button>
                <Link to="/">Já tem uma conta? <strong>Faça login</strong></Link>
            </form>
        </div>
    )
}