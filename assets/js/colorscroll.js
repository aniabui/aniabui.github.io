$(document).ready(function(){
  function setNewColor(scroll_pos, start_pos, start_color, end_pos, end_color) {
    var total_distance = end_pos - start_pos;
    var relative_pos = scroll_pos - start_pos;
    var percentScrolled = relative_pos / total_distance;
    var newRed = start_color.red() + ( ( end_color.red() - start_color.red() ) * percentScrolled );
    var newGreen = start_color.green() + ( ( end_color.green() - start_color.green() ) * percentScrolled );
    var newBlue = start_color.blue() + ( ( end_color.blue() - start_color.blue() ) * percentScrolled );
    var newColor = new $.Color( newRed, newGreen, newBlue );
    $('body').animate({ backgroundColor: newColor }, 0);
  }

  function setSolidColor(color) {
      $('body').animate({ backgroundColor: color }, 0);
  }

  function setBackground() {
    var scroll_pos = $(this).scrollTop();
    var color_0 = new $.Color(aniabui.colorscroll[0].color);
    var color_1 = new $.Color(aniabui.colorscroll[1].color);
    var color_2 = new $.Color(aniabui.colorscroll[2].color);
    var color_3 = new $.Color(aniabui.colorscroll[3].color);
    var animation_pos_0 = aniabui.colorscroll[0].pos_fn();
    var animation_pos_1 = aniabui.colorscroll[1].pos_fn();
    var animation_pos_2 = aniabui.colorscroll[2].pos_fn();
    var animation_pos_3 = aniabui.colorscroll[3].pos_fn();
    if (scroll_pos < animation_pos_0) {
      setSolidColor(color_0);
    } else if (animation_pos_0 <= scroll_pos && scroll_pos < animation_pos_1) {
      setNewColor(scroll_pos, animation_pos_0, color_0, animation_pos_1, color_1);
    } else if (animation_pos_1 <= scroll_pos && scroll_pos < animation_pos_2) {
      setSolidColor(color_1);
    } else if (animation_pos_2 <= scroll_pos && scroll_pos < animation_pos_3) {
      setNewColor(scroll_pos, animation_pos_2, color_2, animation_pos_3, color_3);
    } else /* if (animation_pos_3 <= scroll_pos) */ {
      setSolidColor(color_3);
    }
  }

  // Run at least once at the beginning to set the correct value.
  setBackground();

  $(document).scroll(setBackground);
});

