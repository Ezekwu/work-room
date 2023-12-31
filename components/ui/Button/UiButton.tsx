"use client" ;
import styles from './button.module.scss'
import Image from 'next/image';

// type ButtonVariant = 'primary' | 'grey' | 'purple' | 'green' |'red'

interface Props {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e?: any) => void;
}

export default function UiButton({ 
  children,
  disabled= false, 
  loading= false, 
  onClick,
} : Props) {
  return (
    <button className={`${styles.button}`} type='submit' onClick={onClick}>
      {loading ? <p>loading...</p> : children }
      
    </button>
  )
}