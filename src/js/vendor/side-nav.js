const SideNav = () => {
  $('nav.ess.side-nav ul li').click(function() {
    $('nav.ess.side-nav ul li').removeClass('active');
    $(this).each(function() {
      $(this).addClass('active');
    })
  })
};

// export default SideNav;