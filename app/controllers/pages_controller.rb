class PagesController < ApplicationController

  def home
    @code = ('A'..'Z').to_a.shuffle[0,4].join
  end

  def join

  end
end
