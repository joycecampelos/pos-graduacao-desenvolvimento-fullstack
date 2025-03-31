import { FontAwesomeIcon } from "@src/lib/fontawesome";
import { faCheck, faCopy, faShareFromSquare } from "@src/lib/fontawesome/solid";
import styles from "./styles.module.css";
import { useCopyText } from "@src/hooks/useCopyText";

export type JokeCardProps = {
  joke: string;
};

export function JokeCard({ joke }: JokeCardProps) {
  const {copied, copyTextToClipboard} = useCopyText();

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <p>{joke}</p>
      </div>
      <div className={styles.cardFooter}>
        <a onClick={() => copyTextToClipboard(joke)}>
          <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          {copied ? "Copied" : "Copy"}
        </a>
        <a onClick={() => { }}>
          <FontAwesomeIcon icon={faShareFromSquare} />
          Share on Twitter
        </a>
      </div>
    </div>
  );
}
