import ThreadForm from "../components/forms/ThreadForm"
import ThreadList from "../components/ThreadList"

ThreadForm

function Home() {
  return (
    <>
    <div className="discussion-container">
      <ThreadForm />
      <ThreadList />
    </div>
    </>
  )
}

export default Home