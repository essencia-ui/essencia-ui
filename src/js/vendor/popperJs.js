// import Popper from 'popper.js'

const PopUp = (referenceObject, popperNode) => {
  let status = null;

  referenceObject.addEventListener('click', function(e) {
    e.preventDefault();
    if(status == null) {
      popperNode.classList.add('active')
      status = new Popper(referenceObject, popperNode)
    }
    window.addEventListener('click', close, true)
  }, false);

  const close = () => {
    if(status != null) {
      status.destroy()
      popperNode.classList.add('active')
      window.removeEventListener('click', close, true)
      status = null
    }
  }
};

// export default popper;