from re import match

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope
from xblock.fields import String
from xblock.fragment import Fragment


class QualtrixXblock(XBlock):
    name = String(
        default="QualtrixXblock",
        scope=Scope.settings,
        help='TODO',
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def resource_url(self, path):
        url = path or ''
        if not match(r'^(([a-z]+:\/)?\/)', url):
            url = self.runtime.local_resource_url(self, url)
        return url

    def student_view(self, context=None):
        html = self.resource_string("private/html/view.html")
        frag = Fragment(html.format(
            name=self.name,
        ))
        frag.add_css_url(self.resource_url("public/view.less.min.css"))
        frag.add_javascript_url(self.resource_url("public/view.js.min.js"))
        frag.initialize_js('QualtrixXblockView')
        return frag

    def studio_view(self, context=None):
        html = self.resource_string("private/html/edit.html")
        frag = Fragment(html.format(
            name=self.name,
        ))
        frag.add_javascript_url(self.resource_url("public/edit.js.min.js"))
        frag.initialize_js('QualtrixXblockEdit')
        return frag

    @XBlock.json_handler
    def studio_view_post(self, data, suffix=''):
        self.name = data['xblock_qualtrix_xblock_name']
        return {
            'xblock_qualtrix_xblock_name': self.name,
        }

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QualtrixXblock",
             """<vertical_demo>
                    <qualtrix_xblock />
                    <qualtrix_xblock name="My First XBlock" />
                </vertical_demo>
             """),
        ]
