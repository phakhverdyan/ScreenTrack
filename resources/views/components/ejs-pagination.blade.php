@push('ejs-templates')
    <script type="text/ejs" id="pagination-template">
        <% if (pagination) { %>
            <ul class="pagination" role="navigation">
                <% if (pagination.current_page == 1) { %>
                    <li class="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.previous')">
                        <span class="page-link" aria-hidden="true">&lsaquo;</span>
                    </li>
                <% } else { %>
                    <li class="page-item">
                        <a class="page-link" data-page="<%= pagination.current_page - 1 %>" rel="prev" aria-label="@lang('pagination.previous')">&lsaquo;</a>
                    </li>
                <% } %>
                
                <% for (var page = 1; page <= pagination.last_page; ++page) { %>
                    {{-- @if (is_string($element))
                        <li class="page-item disabled" aria-disabled="true"><span class="page-link">{{ $element }}</span></li>
                    @endif --}}
                    
                    
                    <% if (page == pagination.current_page) { %>
                        <li class="page-item active" aria-current="page">
                            <span class="page-link"><%= page %></span>
                        </li>
                    <% } else { %>
                        <li class="page-item">
                            <a class="page-link" href="#" data-page="<%= page %>"><%= page %></a>
                        </li>
                    <% } %>
                <% } %>
                
                <% if (pagination.current_page != pagination.last_page) { %>
                    <li class="page-item">
                        <a class="page-link" data-page="<%= pagination.current_page + 1 %>" rel="next" aria-label="@lang('pagination.next')">&rsaquo;</a>
                    </li>
                <% } else { %>
                    <li class="page-item disabled" aria-disabled="true" aria-label="@lang('pagination.next')">
                        <span class="page-link" aria-hidden="true">&rsaquo;</span>
                    </li>
                <% } %>
            </ul>
        <% } %>
    </script>
@endpush