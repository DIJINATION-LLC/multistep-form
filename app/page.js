import Image from "next/image";
import Login from "./login/components/Login";
import MultiStepPage from "./multistep-form/page";
import { redirect } from 'next/navigation'


export default function Home() {

  redirect('/login')

}
