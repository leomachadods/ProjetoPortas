import { useEffect, useState } from "react";
import Porta from "../../../components/Porta";
import { atualizarPortas, criarPortas } from "../../../functions/portas";
import styles from "../../../styles/Jogo.module.css";
import Link from 'next/link'
import { useRouter } from 'next/router';

export default function Jogo() {
  const router = useRouter()

  const [valido, setValido] = useState(false);
  const [portas, setPortas] = useState([]);

  useEffect(() => {
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente

    const qtdeDePortasValida = portas >= 2 && portas <= 100
    const temPresenteValido = temPresente >= 1 && temPresente <= portas

    setValido(qtdeDePortasValida && temPresenteValido)
  }, [portas, router.query.portas, router.query.temPresente])

  useEffect(() => {
    const portas = +router.query.portas
    const temPresente = +router.query.temPresente
    setPortas(criarPortas(portas, temPresente))
  }, [router?.query])

  router.query.temPresente

  function renderizarPortas() {
    return portas.map((porta) => {
      return (
        <Porta
          key={porta.numero}
          objeto={porta}
          myOnChange={(novaPorta) =>
            setPortas(atualizarPortas(portas, novaPorta))
          }
        ></Porta>
      );
    });
  }
  
  return (
    <div id={styles.jogo}>
      <div className={styles.portas}>{valido ? 
      renderizarPortas() : 
      <div>
        <h2>Erro: Valores inválidos</h2>
      </div>
    }</div>
      <div className={styles.botoes}>
          <Link href="/" passHref>
              <button>Reiniciar jogo</button>
          </Link>
      </div>
    </div>
  );
}
