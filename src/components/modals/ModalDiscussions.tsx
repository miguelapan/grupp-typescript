function ModalDiscussions({modalHandler}: {modalHandler: () => void}) {
  return (
    <div className="modal">
              <div className="modal-content">
                
                <button onClick={() => modalHandler()}>CLOSE</button>
              </div>
            </div>
  )
}

export default ModalDiscussions