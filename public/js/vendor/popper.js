import Popper from './node_modules/popper.js/dist/popper.js';

export default popper = () => {
  let referenceObject = document.querySelector('#popover');
  let popperNode = document.querySelector('.popover');
  let pp = null;

  referenceObject.addEventListener('click', function(e) {
    e.preventDefault();
    if(pp == null) {
      popperNode.classList.add('active')
      pp = new Popper(referenceObject, popperNode)
    }
    window.addEventListener('click', close, true)
  }, false);

  const close = () => {
    if(pp != null) {
      pp.destroy()
      popperNode.classList.add('active')
      window.removeEventListener('click', close, true)
      pp = null
    }
  }
}
