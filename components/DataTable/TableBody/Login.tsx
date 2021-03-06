import * as React from 'react'
import { useAppContext } from '../../../context/AppProvider'
import * as types from '../../../types/rpg-types'
import MyMapTest from '../../Image/MyMapTest'
import * as vars from '../../../data/mapImage'
import useStomp from '../../../hooks/useStomp'
import Chat from '../../Chat/ChatClient'

function Login() {
  //Note that reference type must correspond to the HTML element it references, e.g. HTMLInputELement
  const { account, setAccount, isConnected, setIsConnected } = useAppContext()
  const userRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const { sendMessage, connect } = useStomp()

  function login(event: any) {
    const obj = {
      user: userRef?.current?.value || '',
      password: passwordRef?.current?.value || '',
    }
    console.log(obj)
    setAccount(obj)
    setIsConnected(true)
    connect(obj.user, obj.password)
  }

  /*   React.useEffect(() => {
    //Does this rerender whenever user value changes?
  }, [account]) */

  return (
    <div>
      <input
        type="text"
        name="userInput"
        className=""
        //value=""
        ref={userRef}
      />
      <input
        type="text"
        name="passwordInput"
        className=""
        //value=""
        ref={passwordRef}
      />
      <button onClick={login}>Login</button>
      <MyMapTest source={vars.bigImage} />
      {isConnected && <Chat name={account.name} password={account.password} />}
    </div>
  )
}

export default Login
