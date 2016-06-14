class StaticPagesController < ApplicationController
  def root
    render :layout => "empty"
  end
end
