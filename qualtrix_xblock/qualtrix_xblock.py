from re import match

import pkg_resources, cgi

from xblock.core import XBlock
from xblock.fields import Scope
from xblock.fields import String
from xblock.fragment import Fragment


class QualtrixXblock(XBlock):
    name = String(
        default="Survey",
        scope=Scope.settings,
        help='TODO',
    )
    surveyId = String(
        default="1234",
        scope=Scope.settings,
        help='TODO',
    )
    yourUniversity = String(
        default="stanford",
        scope=Scope.settings,
        help='TODO',
    )                       
    linkText = String(
        default="click here",
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
        
        anonymous_student_id = self.xmodule_runtime.anonymous_student_id
        
        frag = Fragment(html.format(
            name=self.name,
            surveyId=self.surveyId,
            yourUniversity=self.yourUniversity,
            linkText=self.linkText,
            anonUserId=anonymous_student_id,
        ))

        frag.add_css_url(self.resource_url("public/view.less.min.css"))
        frag.add_javascript_url(self.resource_url("public/view.js.min.js"))
        frag.initialize_js('QualtrixXblockView')
        return frag

    def studio_view(self, context=None):
        
        print "****"
        print self.yourUniversity
       # anonymous_student_id = self.xmodule_runtime.anonymous_student_id
        
        source_text = """
        <p>The survey will open in a new browser tab or window.</p>
        <p><a href="https://""" + self.yourUniversity + """.qualtrics.com/SE/?SID=""" + self.surveyId + """&amp;a=%%USER_ID%%" target="_blank">{linkText}</a></p>
        """
        
        print source_text
        
        html = self.resource_string("private/html/edit.html")
        frag = Fragment(html.format(
            name=self.name,
            surveyId=self.surveyId,
            yourUniversity=self.yourUniversity,
            linkText=self.linkText,
            source_content = cgi.escape(source_text),
        ))
        frag.add_javascript_url(self.resource_url("public/edit.js.min.js"))
        frag.initialize_js('QualtrixXblockEdit')
        return frag

    @XBlock.json_handler
    def studio_view_post(self, data, suffix=''):
        self.name = data['xblock_qualtrix_xblock_name']
        self.surveyId = data['xblock_qualtrix_xblock_survey_id']
        self.yourUniversity = data['xblock_qualtrix_xblock_your_university']
        self.linkText = data['xblock_qualtrix_xblock_link_text']
        return {
            'xblock_qualtrix_xblock_name': self.name,
            'xblock_qualtrix_xblock_survey_id': self.surveyId,
            'xblock.qualtrix_xblock_your_university': self.yourUniversity,
            'xblock_qualtrix_xblock_link_text': self.linkText,
        }

    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("QualtrixXblock",
             """<vertical_demo>
                    <qualtrix_xblock />
                </vertical_demo>
             """),
        ]
