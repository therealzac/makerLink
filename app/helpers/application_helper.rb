module ApplicationHelper
    def is_active_controller(controller_name)
        params[:controller] == controller_name ? "active" : nil
    end

    def is_active_action(action_name)
        params[:action] == action_name ? "active" : nil
    end

    def auth_token_input
      "<input
        type=\"hidden\"
        name= \"authenticity_token\"
        value= \"#{form_authenticity_token}\">".html_safe
    end
end
