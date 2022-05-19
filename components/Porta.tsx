import styles from "../styles/Porta.module.css";
import PortaModel from "../model/PortaModel";
import Presente from "./Presente";

interface PortaProps {
  objeto: PortaModel; //Uma variável que recebe uma instância de PortaModel
  myOnChange: (novaPorta: PortaModel) => void; //Um método que recebe uma instância de PortaModel
}

export default function Porta(props: PortaProps) {
  //props é do tipo da interface
  //Isso implica que, você é obrigado a passar todos os parâmetros da interface

  const porta = props.objeto; //Simplesmente está pegando a props objeto
  //que é uma instância de PortaModel e armazenando em uma constante

  const selecionada =
    porta.selecionada && !porta.aberta ? styles.selecionada : "";

  const passarUmObjetoParaOnChange = (e) =>
    props.myOnChange(porta.alternarSelecao());
  //Simplesmente pega a propriedade onChange e usa
  //um método do objeto que foi criado a partir da classe PortaModel
  //para alterar o estado da porta
  const abrir = (e) => {
    e.stopPropagation();
    props.myOnChange(porta.abrir());
  };
  //Mesma coisa do exemplo acima

  function renderizarPorta() {
    return (
      <div className={styles.porta}>
        <div className={styles.numero}>{porta.numero}</div>
        <div className={styles.macaneta} onClick={abrir}></div>
      </div>
    );
  }

  return (
    <div className={styles.area} onClick={passarUmObjetoParaOnChange}>
      <div className={`${styles.estrutura} ${selecionada}`}>
        {porta.fechada ? (
          renderizarPorta()
        ) : porta.temPresente ? (
          <Presente></Presente>
        ) : (
          false
        )}
      </div>
      <div className={styles.chao}></div>
    </div>
  );
}
