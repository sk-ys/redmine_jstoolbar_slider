class JstoolbarSlider::Hooks < Redmine::Hook::ViewListener
  render_on :view_layouts_base_html_head, :partial => "jstoolbar_slider/base"
end
