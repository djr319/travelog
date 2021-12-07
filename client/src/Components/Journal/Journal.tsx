import { Journal as JournalType } from "Types/index";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "Context";
import { JournalProvider } from "./journal.context";

import { JournalAPI } from "Services/index";
import { JournalsList } from "Components/index";
import JournalMenu from "./JournalMenu/JournalMenu";
import CreatePage from "./CreatePage/CreatePage";
import EditPage from "./EditPage/EditPage";
import ViewPage from "./ViewPage/ViewPage";

import "./Journal.css";

function getFreeJournalId(journals: JournalType[]) {
  const maxId = Math.max(-1, ...journals.map((journal) => journal.id));
  return maxId + 1;
}

export default function Journal(): JSX.Element {
  const [journals, setJournals] = useState<JournalType[]>([]);

  const [page, setPage] = useState(<CreatePage handleSubmit={handleSubmit} />);
  console.log("journals", journals);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const journals = await JournalAPI.getAllJournals(uid);
      setJournals(journals);
    })();
  }, []);

  function updateEntry(
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    review: string,
    photoURL: string
  ) {
    e.preventDefault();

    JournalAPI.updateJournal(uid, { id, review, photoURL });

    setJournals((prev) => {
      const journalCopy = prev.find((journal) => journal.id === id);
      if (journalCopy) {
        journalCopy.review = review;
        journalCopy.photoURL = photoURL;
      }
      return prev;
    });

    setPage(
      <ViewPage
        id={id}
        text={review}
        photoURL={photoURL}
        switchEditMode={switchEditMode}
        deleteEntry={deleteEntry}
      />
    );
  }

  function deleteEntry(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();

    setPage(<CreatePage handleSubmit={handleSubmit} />);

    JournalAPI.deleteJournal(uid, id);

    setJournals((prev) => {
      const index = prev.findIndex((journal) => journal.id === id);
      if (index > -1) prev.splice(index, 1);
      return prev;
    });
  }

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    review: string,
    photoURL: string
  ) {
    e.preventDefault();

    const id = getFreeJournalId(journals);
    console.log("pic in journal", photoURL);
    JournalAPI.addJournal(uid, { id, review, photoURL });
    setJournals((prev) => [...prev, { id, review, photoURL }]);

    setPage(
      <ViewPage
        id={id}
        text={review}
        photoURL={photoURL}
        switchEditMode={switchEditMode}
        deleteEntry={deleteEntry}
      />
    );
  }

  function switchEditMode(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
    text: string,
    photoURL: string
  ) {
    e.preventDefault();

    setPage(
      <EditPage
        id={id}
        text={text}
        photoURL={photoURL}
        updateEntry={updateEntry}
      />
    );
  }

  /**
   ** Called on 'New story' menu button
   */
  function handleNew(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    // FIXME: using journals array index as id is not safe
    setPage(<CreatePage handleSubmit={handleSubmit} />);
  }

  function handleClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();

    // FIXME: using journals array index as id is not safe
    const journal = journals.find((journal) => journal.id === id);
    if (journal === undefined) return;

    setPage(
      <ViewPage
        id={journal.id}
        text={journal.review}
        photoURL={journal.photoURL}
        switchEditMode={switchEditMode}
        deleteEntry={deleteEntry}
      />
    );
    console.log("pic", journal.photoURL);
  }

  return (
    <div className="journal">
      <JournalProvider value={{ journals, setJournals, page, setPage }}>
        <JournalMenu
          journals={journals}
          handleClick={handleClick}
          handleNew={handleNew}
        />
        {page}
        <JournalsList journals={journals} />
      </JournalProvider>
    </div>
  );
}
